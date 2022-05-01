import { IconeLua, IconeSol } from './icons'
import {
  ThemeBtnContainerDark,
  ThemeBtnContainerLight
} from '../../styles/components/Template/ChangeThemeBtn'

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
      <div
        className={`icon
    
            `}
      >
        {IconeSol()}
      </div>
      <div
        className={`text
            `}
      >
        <span className="text-sm">Claro</span>
      </div>
    </ThemeBtnContainerDark>
  ) : (
    <ThemeBtnContainerLight onClick={changeTheme}>
      <div
        className={`
               text
            `}
      >
        <span className="text-sm">Escuro</span>
      </div>
      <div
        className={`
                icon
            `}
      >
        {IconeLua()}
      </div>
    </ThemeBtnContainerLight>
  )
}

export default ChangeThemeBtn
