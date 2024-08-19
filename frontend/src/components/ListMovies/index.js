import './ListMovies.css'

function ListMovies({children}){
    return(
        <ul className="ListMovies">
            {children}
        </ul>
    )
}
export {ListMovies}