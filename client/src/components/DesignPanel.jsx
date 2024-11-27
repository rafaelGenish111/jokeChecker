import React, {useState } from 'react'
import { Button, MenuItem, Select } from '@mui/material';
import ThemeContext from '../contexts/ThemeContext';

const icons = ['TimerIcon', 'TimerTwoToneIcon', 'TimerOutlinedIcon']
const colors = ['paleturquoise', 'olive', 'red', 'brown', 'grey'];
const fonts = ['fantasy', 'Arial, Helvetica, sans-serif', 'Cambria, Cochin, Georgia, Times, Times New Roman, serif', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"];
const fontSize = [10, 12, 14, 16, 18, 20]

export default function DesignPanel({children}) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? JSON.parse(savedTheme) : {
      icon: "TimerIcon",
      color: "paleturquoise", 
      font: "rial, Helvetica, sans-serif",
      fontSize: 18
    }
  })

  const handleSave = () => {
    localStorage.setItem('theme', JSON.stringify(theme))
    alert('setting saved successfully')
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
      <div>
        <Select value={theme.icon} onChange={(e) => setTheme({...theme, icon: e.target.value})}>
          {icons.map((icon) => (
            <MenuItem key={icon} value={icon}>{icon}</MenuItem>
          ))}
        </Select>
        <Select value={theme.color} onChange={(e) => setTheme({...theme, color: e.target.value})}>
          {colors.map((color) => (
            <MenuItem key={color} value={color}>{color}</MenuItem>
          ))}
        </Select>
        <Select value={theme.font} onChange={(e) => setTheme({...theme, font: e.target.value})}>
          {fonts.map((font) => (
            <MenuItem key={font} value={font}>{font}</MenuItem>
          ))}
        </Select>
        <Select value={theme.fontSize} onChange={(e) => setTheme({...theme, fontSize: e.target.value})}>
          {fontSize.map((font) => (
            <MenuItem key={font} value={font}>{font}</MenuItem>
          ))}
        </Select>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </ThemeContext.Provider>
  )
}

