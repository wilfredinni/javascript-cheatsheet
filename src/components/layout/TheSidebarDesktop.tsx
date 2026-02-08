import { cheatsheetNavigation, mainNavigation } from '../../content/navigation'
import SidebarNavigation from './TheSidebarNavigation'

export default function SidebarDesktop() {
  return (
    <nav>
      <SidebarNavigation
        navigation={mainNavigation}
        sectionName="Introduction"
      />
      <SidebarNavigation
        navigation={cheatsheetNavigation}
        sectionName="Cheatsheet"
      />
    </nav>
  )
}
