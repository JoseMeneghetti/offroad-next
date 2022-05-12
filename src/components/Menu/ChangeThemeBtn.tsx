import {
  ThemeBtnContainerDark,
  ThemeBtnContainerLight
} from '../../styles/components/Menu/ChangeThemeBtn'
import { MoonStars, Sun } from 'phosphor-react'

interface ChangeThemeBtnProps {
  tema: string
  changeTheme: () => void
}
const ChangeThemeBtn: React.FC<ChangeThemeBtnProps> = ({
  tema,
  changeTheme
}) => {
  return tema === 'dark' ? (
    <ThemeBtnContainerDark onClick={changeTheme}>
      <div className="icon">
        <Sun size={30} />
      </div>
    </ThemeBtnContainerDark>
  ) : (
    <ThemeBtnContainerLight onClick={changeTheme}>
      <div className="icon">
        <MoonStars size={30} />
      </div>
    </ThemeBtnContainerLight>
  )
}

export default ChangeThemeBtn
