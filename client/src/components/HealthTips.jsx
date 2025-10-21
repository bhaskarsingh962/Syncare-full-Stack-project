import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HealthTips = () => {
  const navigate = useNavigate()
  const [activeTip, setActiveTip] = useState(0)

  const healthTips = [
    {
      id: 1,
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily to maintain optimal health and energy levels.",
      icon: "💧",
      category: "Daily Wellness"
    },
    {
      id: 2,
      title: "Regular Exercise",
      description: "Aim for 30 minutes of moderate exercise daily to boost your immune system.",
      icon: "🏃‍♂️",
      category: "Fitness"
    },
    {
      id: 3,
      title: "Balanced Diet",
      description: "Include fruits, vegetables, and whole grains in your meals for better nutrition.",
      icon: "🥗",
      category: "Nutrition"
    },
    {
      id: 4,
      title: "Quality Sleep",
      description: "Get 7-9 hours of sleep each night for proper rest and recovery.",
      icon: "😴",
      category: "Sleep Health"
    },
    {
      id: 5,
      title: "Stress Management",
      description: "Practice meditation or deep breathing to reduce stress and anxiety.",
      icon: "🧘‍♀️",
      category: "Mental Health"
    },
    {
      id: 6,
      title: "Regular Checkups",
      description: "Schedule annual health checkups to catch potential issues early.",
      icon: "🩺",
      category: "Preventive Care"
    }
  ]

  const quickStats = [
    { number: "1000+", label: "Happy Patients", icon: "👥" },
    { number: "50+", label: "Expert Doctors", icon: "👨‍⚕️" },
    { number: "24/7", label: "Emergency Support", icon: "🚨" },
    { number: "15+", label: "Medical Specialties", icon: "🏥" }
  ]

  const emergencyActions = [
    {
      title: "Emergency Contact",
      description: "Call our 24/7 emergency line",
      phone: "+91-9627359239",
      icon: "🚨",
      action: () => window.open('tel:+919627359239')
    },
    {
      title: "Book Appointment",
      description: "Schedule your visit online",
      icon: "📅",
      action: () => navigate('/login')
    },
    {
      title: "Find Doctors",
      description: "Browse our specialist directory",
      icon: "🔍",
      action: () => navigate('/doctors')
    },
    {
      title: "Health Records",
      description: "Access your medical history",
      icon: "📋",
      action: () => navigate('/login')
    }
  ]

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Health Tips Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Health & Wellness Tips</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay healthy with our expert-backed wellness advice and preventive care tips
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {healthTips.map((tip, index) => (
            <div
              key={tip.id}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 ${
                activeTip === index ? 'border-blue-500' : 'border-gray-100'
              }`}
              onClick={() => setActiveTip(index)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{tip.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{tip.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {tip.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Section */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Why Choose Prescripto?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold text-center mb-8">Quick Actions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 transition-all duration-300 text-left group"
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <h4 className="font-semibold mb-2">{action.title}</h4>
                <p className="text-blue-100 text-sm mb-2">{action.description}</p>
                {action.phone && (
                  <p className="text-white font-medium">{action.phone}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Health Awareness Banner */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Prevention is Better Than Cure</h3>
            <p className="text-green-100 mb-6">
              Regular health checkups and preventive care can help you maintain good health and catch potential issues early.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/doctors')}
                className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
              >
                Find a Doctor
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Get Health Advice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthTips
