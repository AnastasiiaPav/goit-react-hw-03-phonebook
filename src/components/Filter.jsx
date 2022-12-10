import propTypes from 'prop-types';


export const  Filter = ({onChange, value }) => {
  return(
    <label > Search
        <input type="text" value={value} onChange={onChange}/>
    </label>
  )
    
} 
Filter.propTypes = {
  onChange: propTypes.func,
  value: propTypes.string,
}