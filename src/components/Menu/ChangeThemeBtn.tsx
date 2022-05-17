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
  return tema === 'light' ? (
    <ThemeBtnContainerLight onClick={changeTheme}>
      <div className="icon">
        <MoonStars size={30} />
      </div>
    </ThemeBtnContainerLight>
  ) : (
    <ThemeBtnContainerDark onClick={changeTheme}>
      <div className="icon">
        <Sun size={30} />
      </div>
    </ThemeBtnContainerDark>
  )
}

export default ChangeThemeBtn
