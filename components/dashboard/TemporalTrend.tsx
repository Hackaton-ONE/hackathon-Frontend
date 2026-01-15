"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [

  { day: "Segunda", positive: 45, negative: 25 },
  { day: "Terça", positive: 52, negative: 28 },
  { day: "Quarta", positive: 68, negative: 32 },
  { day: "Quinta", positive: 61, negative: 45 },
  { day: "Sexta", positive: 58, negative: 38 },
  { day: "Sábado", positive: 65, negative: 42 },
  { day: "Domingo", positive: 70, negative: 48 },

]

export function TemporalTrend() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {

    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)

  }, [])

  const formatXAxis = (tickItem: string) => {
    if (isMobile) return tickItem.substring(0, 3)
    return tickItem

  }

  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/50 rounded-2xl p-6 h-full">

      <h3 className="text-white font-poppins font-bold text-md mb-6 uppercase tracking-wide">
        Tendência Temporal (7 Dias)
      </h3>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart
            data={data}
            margin={{ top: 5, right: 40, left: 0, bottom: 5 }}

        >

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(96,165,250,0.5)" />

          <XAxis

            dataKey="day"
            stroke="rgba(96,165,250,100)"
            style={{ fontSize: "12px" }}
            tickFormatter={formatXAxis}
            interval={0}

          />

          <YAxis stroke="rgba(96,165,250,100)" style={{ fontSize: "12px" }} />

          <Tooltip

            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "white",

            }}

          />

          <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", r: 4 }} />

          <Line type="monotone" dataKey="negative" stroke="#B91C1C" strokeWidth={3} dot={{ fill: "#B91C1C", r: 4 }} />

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}