import React, { useState, useEffect, useContext } from 'react'
import { Dialog, DialogContent, DialogActions, Button, Backdrop, Box, Grid2 } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PopupContext from '../contexts/PopupContext';
import ThemeContext from '../contexts/ThemeContext';

export default function Popup({ open, value, handleConfirm }) {
  const [timeRemaining, setTimeRemaining] = useState(100)
  const [progress, setProgress] = useState(100)
  const [color, setColor] = useState('green')
  const { setOpenPopup } = useContext(PopupContext)
  const theme = useContext(ThemeContext)

  const changeColor = (progress) => {
    if (progress < 10) {
      setColor('red')
    } else if (progress < 40) {
      setColor('yellow')
    } else {
      setColor('green')
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 0.5)
      setProgress((prevProgress) => Math.max(0, prevProgress - 0.5));
      changeColor(progress);
      if (timeRemaining === 0)
        setOpenPopup(false)
      clearInterval(interval)
    }, 100);


    return () => {
      clearInterval(interval)
    }
  }, [progress, setOpenPopup, timeRemaining])

  const renderIcon = () => {
    switch (theme.icon) {
      case 'TimerIcon':
        return <TimerIcon />
      case 'TimerTwoToneIcon':
        return <TimerTwoToneIcon />
      case 'TimerOutlinedIcon':
        return <TimerOutlinedIcon />
      default:
        return null;
    }
  }



  return (
    <Dialog open={Boolean(open)} onClose={handleConfirm}
      sx={{ borderRadius: 3 }}
    >
      <Backdrop
        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1, opacity: 0.8 }}
        open={open}
        onClick={handleConfirm}
      >
        {
          value ?
            (
              <div className='modal'
                style={{ backgroundColor: theme.color, fontFamily: theme.font, fontSize: theme.fontSize }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
                  <Grid2 container justifyContent="center" alignItems="left" sx={{ height: '50px' }}>
                    <div className='timebar'>
                      <Box
                        sx={{
                          width: `${progress}%`,
                          backgroundColor: color,
                          transition: 'background-color 0.3s ease-in-out',
                        }}
                      />
                      <div className='progress' style={{
                        width: `${progress}%`,
                        backgroundColor: color
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <div style={{ color: "black" }}>{renderIcon()}</div>
                        </Box>
                      </div>
                    </div>
                  </Grid2>
                  <div className='content'>
                    <DialogContent>
                      <p>{value}</p>
                      <p>is the joke the right length?</p>
                    </DialogContent>
                  </div>
                  <Grid2 container justifyContent="right" alignItems="center">
                    <DialogActions>
                      <Button
                        onClick={handleConfirm}
                        variant="contained" sx={{ mb: 2 }}
                      >
                        CHECK
                      </Button>
                    </DialogActions>
                  </Grid2>
                </Box>
              </div>
            ) :
            (<h1>Wait for new Joke...</h1>)
        }
      </Backdrop>
    </Dialog>
  )
}
