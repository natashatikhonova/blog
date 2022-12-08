export default function Message({children, user, description}){
    return(
        <div className="bg-white p-8 border-b-2 rounded-lg">
            <div className="flex items-center gap-2">
                <img src=""/>
                <h2>{user}</h2>
            </div>    
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}