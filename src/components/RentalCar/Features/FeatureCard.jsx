import React from 'react'

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="reveal-y flex transform flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-md">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

export default FeatureCard
