// Test rapide pour vérifier que toutes les dépendances sont OK
import { Home, Menu, Search, Type, Maximize, Minimize, ChevronUp } from 'lucide-react'

console.log('✅ Toutes les icônes Lucide sont disponibles:', {
  ChevronUp, Home, Maximize, Menu, Minimize, Search, Type
})

export default function TestImports() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Test des imports ActionsBar</h1>
      <div className="flex space-x-4">
        <Home size={20} strokeWidth={1.5} className="text-[#7A7A7A]" />
        <Menu size={20} strokeWidth={1.5} className="text-[#7A7A7A]" />
        <Search size={20} strokeWidth={1.5} className="text-[#7A7A7A]" />
        <Type size={20} strokeWidth={1.5} className="text-[#7A7A7A]" />
        <Maximize size={20} strokeWidth={1.5} className="text-[#7A7A7A]" />
        <ChevronUp size={20} strokeWidth={1.5} className="text-[#7A7A7A]" />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Si vous voyez toutes les icônes ci-dessus, l'import Lucide fonctionne correctement.
      </p>
    </div>
  )
}
