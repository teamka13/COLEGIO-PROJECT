import MyChart from "./grafficos/barras";
import RefererChart from "./grafficos/pastel";
import RadarAsistencias from "./grafficos/radar";
import AttendanceChart from "./grafficos/2barras";
import FaltasSexo from "./grafficos/FaltasSexo";
import AsistenciaSexo from "./grafficos/AsistenciaSEX";
import Mensual from "./grafficos/Mensual";
import MensualAsistenciasSEX from "./grafficos/MensualAsistenciaSexo 2";
import MensualFaltasSEX from "./grafficos/MensualFaltasSexo";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <h1 className="text-3xl md:text-4xl font-bold pt-5 font-montserrat text-white text-center mb-10">
        Gráficos de Asistencia 9 - 13 de julio
      </h1>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg space-y-12 overflow-x-auto overflow-y-auto">
        {/* Primera fila */}
        <div className="overflow-x-auto">
          <div className="flex gap-8 w-max">
            <div className="inline-block">
              <MyChart />
            </div>
            <div className="inline-block">
              <AsistenciaSexo />
            </div>
            <div className="inline-block">
              <FaltasSexo />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-8 w-max">
            <div className="inline-block">
              <AttendanceChart />
            </div>
          </div>
        </div>

        {/* Segunda fila */}
        <div className="overflow-x-auto">
          <div className="flex gap-8 w-max">
            <div className="inline-block">
              <Mensual />
            </div>
            <div className="inline-block">
              <MensualAsistenciasSEX />
            </div>
            <div className="inline-block">
              <MensualFaltasSEX />
            </div>
          </div>
        </div>

        {/* Tercera fila */}
        <div className="overflow-x-auto">
          <div className="flex gap-8 w-max">
            <div className="inline-block">
              <RefererChart />
            </div>
            <div className="inline-block">
              <RadarAsistencias />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
