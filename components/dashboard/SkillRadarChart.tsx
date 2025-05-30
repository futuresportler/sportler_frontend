import type React from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface SkillRadarChartProps {
  data: {
    subject: string
    A: number
    B: number
    fullMark: number
  }[]
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data }) => {
  const renderCustomizedLabel = (props: any) => {
    const { x, y, value } = props
    return (
      <text x={x} y={y} dy={-10} textAnchor="middle" fontSize={10} fill="#666">
        {value}
      </text>
    )
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Skills Overview</h3>
      {data && data.length > 0 ? (
        <div className="md:w-1/2 relative flex justify-center">
          <div className="relative w-full max-w-[240px] h-[240px] mx-auto">
            <svg width="100%" height="100%" viewBox="0 0 240 240" preserveAspectRatio="xMidYMid meet">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <PolarGrid gridType="polygon" />
                  <PolarAngleAxis dataKey="subject" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Me" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  {/* <Radar name="Mike" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
                </RadarChart>
              </ResponsiveContainer>
            </svg>
          </div>
        </div>
      ) : (
        <p>No skill data available.</p>
      )}
    </div>
  )
}

export default SkillRadarChart
