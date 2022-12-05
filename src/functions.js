
export function setCurrentSession(workout){
    return localStorage.setItem('currentSession', JSON.stringify(workout))
}

export function getCurrentSession(){
    return localStorage.getItem('currentSession');
}