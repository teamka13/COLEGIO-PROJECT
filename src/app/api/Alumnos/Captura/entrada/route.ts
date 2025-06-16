import { NextRequest, NextResponse } from "next/server";
import { NotificacionEntradaTG } from "@/app/api/bot/mensajes/entrada/route";
import { sendErrorResponse } from "@/lib/errorResponse";
import { getConnection } from "@/lib/dbMssql"; // Asegúrate de que la ruta sea correcta
import sql from "mssql";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const Matricula = searchParams.get("Matricula");

    if (
      !Matricula ||
      typeof Matricula !== "string" ||
      Matricula.length > 12 ||
      Matricula.length < 7
    ) {
      return sendErrorResponse("INVALID", 422);
    }

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Matricula", sql.VarChar(12), Matricula)
      .execute("spBM");

    if (!result.recordset[0]) {
      return sendErrorResponse("INVALID", 422);
    }

    const query = result.recordset[0];
    console.log("Datos de Entrada enviados");

    if (query.CodigoError === 1) {
      return sendErrorResponse("SINREGISTRO", 409);
    }
    if (query.CodigoError === 2) {
      return sendErrorResponse("SEGUNDOREGISTRO", 404);
    }

    const horaEntradaQuery = query.Hora;
    const horaLimite = new Date();
    horaLimite.setHours(18, 0, 0, 0);

    const horaEntrada = new Date();
    const [h, m] = horaEntradaQuery.split(":").map(Number);
    horaEntrada.setHours(h, m, 0, 0);

    const esTarde = horaEntrada > horaLimite;
    const estado = esTarde ? "T" : "AT";

    const msRetraso = horaEntrada.getTime() - horaLimite.getTime();
    let Retraso = "0 min";

    if (msRetraso > 0) {
      const totalMinutos = Math.floor(msRetraso / 60000);
      const horas = Math.floor(totalMinutos / 60);
      const minutos = totalMinutos % 60;
      Retraso =
        horas > 0
          ? `${horas} hora${horas > 1 ? "s" : ""} ${minutos} min`
          : `${minutos} min`;
    }

    const responseData = {
      ...query,
      estado,
      Retraso,
    };

    if (query.Tel) {
      console.log("Datos Siendo Procesados por telegram");
      NotificacionEntradaTG({
        Tel: query.Tel,
        nombre: query.Nombre,
        paterno: query.Paterno,
        semestre: query.Semestre,
        hora: query.Hora,
      }).catch(console.error);
    }

    return NextResponse.json(responseData);
  } catch (err) {
    console.error("Error en la API:", err);
    return sendErrorResponse("Error interno del servidor", 500);
  }
}
