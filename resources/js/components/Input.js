export default function Input(props){
    return (
        <input className="form-control" onChange={props.onChange} type={props.type} placeholder={props.placeholder}/>
    )
}