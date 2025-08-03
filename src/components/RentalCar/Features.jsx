import React from 'react'
import FeatureCard from './Features/FeatureCard'
import featuresData from './featuresData.json'

import { Shield, Clock4, CreditCard, MapPin, Headphones, FileBadge, Users, Zap } from 'lucide-react'

const iconMap = {
    Shield,
    Clock4,
    CreditCard,
    MapPin,
    Headphones,
    FileBadge,
    Users,
    Zap,
}

const Features = () => {
    return (
        <section className="bg-gray-100 px-4 py-16 sm:px-6 lg:px-28">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="hero-reveal mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">
                    Tại sao chọn Travel Car?
                </h2>
                <p className="hero-reveal mx-auto mb-12 max-w-2xl text-lg text-gray-600">
                    Chúng tôi cam kết mang đến cho bạn trải nghiệm thuê xe tốt nhất với dịch vụ cao
                    cấp và sự tận tâm với khách hàng.
                </p>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {featuresData.map((feature, index) => {
                        const Icon = iconMap[feature.icon]
                        return (
                            <FeatureCard
                                key={index}
                                icon={Icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Features
