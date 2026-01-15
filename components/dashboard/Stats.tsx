import { Database, ChartPie, Goal } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      {/* Total de Análises */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6">

        <div className="flex items-center justify-between mb-4">

          <h3 className="text-white text-md font-poppins font-bold uppercase tracking-wide">Total de Análises</h3>

          <div className="p-2 bg-blue-default rounded-lg">
            <Database className="w-5 h-5 text-white" />
          </div>

        </div>

        <p className="text-5xl font-bold text-white">135</p>

      </div>

      {/* Saldo de Humor */}

      <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6">

        <div className="flex items-center justify-between mb-4">

          <h3 className="text-white text-md font-poppins font-bold uppercase tracking-wide">Saldo de Humor</h3>

          <div className="p-2 bg-blue-default rounded-lg">

            <ChartPie className="w-5 h-5 text-white" />

          </div>
        </div>

        <div className="flex items-center justify-center">

          <div className="relative w-32 h-32">

            {/* SVG Donut Chart */}

            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">

              {/* Background circle */}

              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="12" />

              {/* Arco verde */}

              <circle

                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#10B981"
                strokeWidth="12"
                strokeDasharray="204.2 314.16"
                strokeLinecap="round"

              />

              {/* Arco vermelho */}

              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#B91C1C"
                strokeWidth="12"
                strokeDasharray="109.96 314.16"
                strokeDashoffset="-204.2"
                strokeLinecap="round"

              />

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-inter font-bold text-white">65%</span>
              <span className="text-xs font-inter font-light text-white">Positivo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Precisão Média */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6">

        <div className="flex items-center justify-between mb-4">

          <h3 className="text-white text-md font-poppins font-bold uppercase tracking-wide">Precisão Média</h3>

          <div className="p-2 bg-blue-default rounded-lg">

            <Goal className="w-5 h-5 text-white" />
          </div>
        </div>

        <p className="text-5xl font-bold text-white">92%</p>

      </div>
    </div>
  )
}