
export function setCurrentSession(workout){
    if(workout.title) {
        // this will ignore the initial session entry. If title has a value, then decode.
        workout = {
            ...workout,
            title: decodeURIComponent(workout.title)
        }
    }
    return localStorage.setItem('currentSession', JSON.stringify(workout))
}

export function getCurrentSession(){
    return JSON.parse(localStorage.getItem('currentSession'));
}