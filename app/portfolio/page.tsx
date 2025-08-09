import ProfileSidebar from '@/components/layout/ProfileSidebar'
import ActionsSidebar from '@/components/layout/ActionsSidebar'

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "Interactive Data Visualization Dashboard",
      description: "A React-based dashboard for exploring complex datasets with D3.js visualizations and real-time updates.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      tags: ["React", "D3.js", "Data Viz", "Dashboard"],
      technologies: ["TypeScript", "React", "D3.js", "Node.js"],
      status: "Completed"
    },
    {
      id: 2,
      title: "Geospatial Analysis Platform",
      description: "Full-stack application for analyzing satellite imagery and geographic data with machine learning models.",
      image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=250&fit=crop",
      tags: ["Geospatial", "ML", "Satellite", "Full-stack"],
      technologies: ["Python", "PostGIS", "React", "Docker"],
      status: "In Progress"
    },
    {
      id: 3,
      title: "Agricultural Data Monitoring System",
      description: "IoT-based system for monitoring crop conditions using sensors and predictive analytics.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
      tags: ["IoT", "Agriculture", "Sensors", "Analytics"],
      technologies: ["Python", "Raspberry Pi", "InfluxDB", "Grafana"],
      status: "Completed"
    },
    {
      id: 4,
      title: "Open Source Mapping Tools",
      description: "Collection of tools and libraries for creating interactive maps and spatial visualizations.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
      tags: ["Open Source", "Mapping", "Tools", "Library"],
      technologies: ["JavaScript", "Leaflet", "Mapbox", "WebGL"],
      status: "Active"
    },
    {
      id: 5,
      title: "Climate Data Explorer",
      description: "Web application for exploring historical climate data with interactive charts and forecasting models.",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop",
      tags: ["Climate", "Data", "Forecasting", "Web App"],
      technologies: ["Vue.js", "Python", "TensorFlow", "PostgreSQL"],
      status: "Completed"
    },
    {
      id: 6,
      title: "Real-time Spatial Analytics API",
      description: "High-performance API for processing and analyzing spatial data streams in real-time.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      tags: ["API", "Real-time", "Spatial", "Performance"],
      technologies: ["Go", "Redis", "PostGIS", "Kubernetes"],
      status: "In Progress"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Active':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <ProfileSidebar />
      
      <main className="lg:ml-80 lg:mr-16 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Portfolio
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              A collection of projects showcasing data analysis, visualization, and development work 
              in the fields of geospatial analytics, agriculture technology, and environmental monitoring.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Project Image */}
                <div className="aspect-video bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 p-6 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Interested in collaborating or learning more about any of these projects? 
              <a href="/contact" className="text-blue-600 hover:text-blue-800 ml-1">
                Get in touch
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <ActionsSidebar />
    </div>
  )
}
