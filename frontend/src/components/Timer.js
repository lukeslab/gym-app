import { useEffect } from 'react'

export default function Timer({timer, setTimer}){
    let {hours, minutes, seconds, isPaused, display} = timer;
    console.log('firing from timer', display)
    useEffect(() => {
        let intervalId;
        if(!isPaused){
            intervalId = setInterval(() => {
                console.log('firing from timer interval', timer )
                +seconds <= 9 ? seconds = `0${+seconds+1}` : seconds++
                if (seconds === 60) {
                    +minutes <= 9 ? minutes = `0${+minutes+1}` : minutes++
                    seconds = '00';
                }   
        
                if (minutes === 60) {
                    +hours < 9 ? hours = `0${+hours+1}` : hours++
                    minutes = '00';
                }
                
                setTimer({
                    ...timer,
                    hours,
                    minutes,
                    seconds,
                    display
                })
                
            }, 1000)
        }
        return () => clearInterval(intervalId);
    }, [timer])

    function handleOnClick(){
        setTimer({
            ...timer,
            isPaused: !isPaused
        });
    }

    return( 
        <section className="app-component timer" style={{
            display: display,
            flexDirection: 'column',
            textAlign: 'center'
        }}>
            <div style={{fontSize:'40px', marginTop: '50px'}}>{`${hours}:${minutes}:${seconds}`}</div>
            <button style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                border: '1px solid black',
                padding: '20px 50px',
                marginTop: '25px',
                fontSize: '20px',
                cursor: 'pointer'
            }} onClick={handleOnClick}>{isPaused ? 'Start' : 'Pause'}</button>
        </section>
    )
}