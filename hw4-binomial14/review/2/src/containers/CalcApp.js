import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen_num : 0, 
      num_arr : [], 
      operator_arr: [], 
      last_num_input : true, 
      double_click: false, 
      dot_press: 0, 
      equal_arr : [],
      equal_double_click:false };
  }

  resetState = ()=>{
    this.setState(state =>({screen_num : 0, num_arr : [], operator_arr: [], last_num_input : true, double_click:false, dot_press: 0, equal_arr : [],equal_double_click:false}))
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  multiple_and_divide = (operator)=>{
    const operator_arr_len = this.state.operator_arr.length
    var temp_operator_arr = this.state.operator_arr
    var temp_arr = this.state.num_arr
    const num_arr_len = this.state.num_arr.length 
    if (operator_arr_len > 0){
      var old_operator = this.state.operator_arr[operator_arr_len-1]}
    if (! this.state.double_click && this.state.last_num_input){
      if (old_operator === 'x' || old_operator === '÷'){
        if (old_operator ==='x'){
          var temp_num = parseFloat(temp_arr[num_arr_len-2]) * parseFloat(temp_arr[num_arr_len-1])
        }else{
          var temp_num = parseFloat(temp_arr[num_arr_len-2]) / parseFloat(temp_arr[num_arr_len-1])
        }
        temp_arr.splice(num_arr_len-2,2)//problem
        temp_arr.push(temp_num)
        temp_operator_arr.splice(operator_arr_len-1,1)
        temp_operator_arr.push(operator)
        this.display(temp_num)
        this.setState(state =>({operator_arr: temp_operator_arr, last_num_input: false, num_arr: temp_arr, double_click:true, dot_press: 0, equal_arr :[],equal_double_click:false}))
        // this.setState(state =>({operator_arr: temp_operator_arr, last_num_input: false, num_arr: temp_arr, screen_num: temp_num, double_click:true, dot_press: 0, equal_arr :[],equal_double_click:false}))
      }else{
        temp_operator_arr.push(operator)
        this.setState(state=>({operator_arr: temp_operator_arr, last_num_input: false, double_click: true,  dot_press: 0 ,equal_arr: [],equal_double_click:false}))
      }
    }else {
      temp_operator_arr[operator_arr_len-1] = operator
      this.setState(state=>({operator_arr:temp_operator_arr, dot_press: 0, equal_arr: [],equal_double_click:false}))
    }
  
    // console.log('multiple_and_divide')
    // console.log(this.state.num_arr)
    // console.log(this.state.operator_arr)
  }


  add_and_subtract = (operator)=>{
    const num_arr_len  = this.state.num_arr.length
    var temp_arr = this.state.num_arr
    const old_operator = this.state.operator_arr[0]
    var operator_arr = this.state.operator_arr
    var temp_num = parseFloat(this.state.screen_num)
    if (num_arr_len === 2 ){
      if (old_operator === '+'){
        temp_num = parseFloat(temp_arr[0]) + parseFloat(temp_arr[1])
      }else if (old_operator === '-'){
        temp_num = parseFloat(temp_arr[0]) - parseFloat(temp_arr[1])
      }else if (old_operator === 'x'){
        temp_num = parseFloat(temp_arr[0]) * parseFloat(temp_arr[1])
      }else{
        temp_num = parseFloat(temp_arr[0]) / parseFloat(temp_arr[1])
      }
    }else if (num_arr_len ===3){
      if (operator_arr[1]==='x'){
        var num_2 = parseFloat(temp_arr[1]) * parseFloat(temp_arr[2])
      }else{var num_2 = parseFloat(temp_arr[1]) / parseFloat(temp_arr[2])}
      if(operator_arr[0] ==='+'){
        temp_num = parseFloat(temp_arr[0]) + num_2
      }else{ temp_num = parseFloat(temp_arr[0]) - num_2}
    }
    var new_num_arr = [temp_num]
    let new_operator_arr = [operator]
    this.display(temp_num)
    // this.setState(state=>({last_num_input: false, operator_arr: new_operator_arr, num_arr: new_num_arr ,screen_num: temp_num ,double_click:false, dot_press: 0 ,equal_arr: [],equal_double_click:false}))
    this.setState(state=>({last_num_input: false, operator_arr: new_operator_arr, num_arr: new_num_arr ,double_click:false, dot_press: 0 ,equal_arr: [],equal_double_click:false}))
    // console.warn('add_and_subtract')
    // console.log('num_arr',this.state.num_arr)
    // console.log('operator_arr',this.state.operator_arr)
  }

  equal = (e)=> {
    const num_arr_len  = this.state.num_arr.length
    var temp_arr = this.state.num_arr
    const old_operator = this.state.operator_arr[0]
    var operator_arr = this.state.operator_arr
    var temp_num = this.state.screen_num
    let operator_arr_len = this.state.operator_arr.length
    if (!this.state.equal_double_click){
      if (num_arr_len === 2 ){
        if (old_operator === '+'){
          temp_num = parseFloat(temp_arr[0]) + parseFloat(temp_arr[1])
        }else if (old_operator === '-'){
          temp_num = parseFloat(temp_arr[0]) - parseFloat(temp_arr[1])
        }else if (old_operator === 'x'){
          temp_num = parseFloat(temp_arr[0]) * parseFloat(temp_arr[1])
        }else{
          temp_num = parseFloat(temp_arr[0]) / parseFloat(temp_arr[1])
        }
      }else if (num_arr_len ===3){
        if (operator_arr[1]==='x'){
          var num_2 = parseFloat(temp_arr[1]) * parseFloat(temp_arr[2])
        }else{var num_2 = parseFloat(temp_arr[1]) / parseFloat(temp_arr[2])}
        if(operator_arr[0] ==='+'){
          temp_num = parseFloat(temp_arr[0]) + parseFloat(num_2)
        }else{ temp_num = parseFloat(temp_arr[0]) - parseFloat(num_2)}
      }
      let temp_equal_arr = [temp_arr[num_arr_len-1],operator_arr[operator_arr_len-1]]
      this.setState(state=>({equal_arr : temp_equal_arr}))
    }else if (this.state.equal_double_click){
      let temp_equal_arr = this.state.equal_arr
      if (temp_equal_arr[1] === '+'){
        temp_num = parseFloat(temp_arr[0]) + parseFloat(temp_equal_arr[0])
      }else if (temp_equal_arr[1] === '-'){
        temp_num = parseFloat(temp_arr[0]) - parseFloat(temp_equal_arr[0])
      }else if (temp_equal_arr[1] === 'x'){
        temp_num = parseFloat(temp_arr[0]) * parseFloat(temp_equal_arr[0])
      }else if (temp_equal_arr[1] === '÷'){
        temp_num = parseFloat(temp_arr[0]) / parseFloat(temp_equal_arr[0])
      } 
    }
    this.display(temp_num)
    this.setState(state=>({last_num_input: true, operator_arr: [], num_arr: [temp_num], double_click:false, equal_double_click:true}))
    // this.setState(state=>({last_num_input: true, operator_arr: [], num_arr: [temp_num], screen_num: temp_num, double_click:false, equal_double_click:true}))
  }

  dot_onClick = (e)=> {
    const temp_num_arr = this.state.num_arr
    const num_arr_len = this.state.num_arr.length
    if ((num_arr_len ===0 || !this.state.last_num_input )&& this.state.dot_press === 0){
      this.state.num_arr.push('0.')
      this.setState(state=>({screen_num:'0.', dot_press: state.dot_press+1, last_num_input: true , equal_arr: [],equal_double_click:false}))
      // console.log('1')
    }else if (this.state.dot_press === 0){
      let temp_num = temp_num_arr[num_arr_len-1]+'.'
      temp_num_arr[num_arr_len-1] = temp_num
      this.setState(state=>({screen_num:temp_num, dot_press: state.dot_press+1, last_num_input: true, equal_arr: [],equal_double_click:false}))
      // console.log('2')
    }
  
  }

  num_pressed = (e)=>{
    if ((String(this.state.screen_num).length  < 7 || !this.state.last_num_input) || this.state.dot_press===0  ){
      // console.log('3')
      if (this.state.last_num_input){
        if (this.state.screen_num == 0 && this.state.screen_num !=='0.'){
          var temp_num = String(e)
        }else {var temp_num = String(this.state.screen_num) + String(e)}
        var temp_arr = this.state.num_arr
        let arr_length = temp_arr.length
        if (arr_length==0){arr_length = 1}
        temp_arr[arr_length-1] = parseFloat(temp_num) 
      }else{
        var temp_num = String(e)
        var temp_arr = this.state.num_arr
        temp_arr.push(parseInt(temp_num))
      }
      this.setState(state=>({screen_num : temp_num, last_num_input : true, num_arr: temp_arr, double_click: false, equal_arr: [],equal_double_click:false}))
    // console.log('num_pressed')
    // console.log('num_arr',this.state.num_arr)
    // console.log('operator_arr',this.state.operator_arr)
    }
  }
  
  display(temp_screen_num) {
    let temp_screen_num_str = String(temp_screen_num)
    let screen_render_num = ''
    if (temp_screen_num_str.length < 8 ){
      screen_render_num = temp_screen_num_str
    }else if (Math.abs(temp_screen_num) < Math.pow(10,7)){
      screen_render_num = temp_screen_num_str.slice(0,8)
    }else if (Math.abs(temp_screen_num)>Math.pow(10,7)){
      // console.warn('big_num')
      let temp_screen_num_sci = temp_screen_num.toExponential()
      let e_index = 0
      let sci_len = temp_screen_num_sci.length
      for (let i=0;i<temp_screen_num_sci.length;i++){
        if (temp_screen_num_sci[i] === 'e'){e_index = i}   }
      let exp_len = sci_len - e_index 
      let slice_start = 9-exp_len
      if (slice_start-1 < e_index){
        screen_render_num = temp_screen_num_sci.slice(0,slice_start-1) + temp_screen_num_sci.slice(e_index)
      }else{screen_render_num = temp_screen_num_sci}
      
      // console.warn(temp_screen_num_sci.slice(e_index))
      // console.warn('sci_len = ',sci_len,'e_index=',e_index)
      // console.warn(temp_screen_num_sci)
    }

    this.setState(state=>({screen_num: screen_render_num,}))
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.screen_num}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.multiple_and_divide}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.num_pressed}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.num_pressed}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.num_pressed}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.multiple_and_divide}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.num_pressed}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.num_pressed}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.num_pressed}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.add_and_subtract}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.num_pressed}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.num_pressed}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.num_pressed}>3</CalcButton>
            <CalcButton className="calc-operator"onClick={this.add_and_subtract}>+</CalcButton>
          </div>
          <div className="calc-row">
          <CalcButton className="calc-number bigger-btn" onClick={this.num_pressed}>0</CalcButton>
          <CalcButton className="calc-number" onClick={this.dot_onClick}>.</CalcButton>
          <CalcButton className="calc-operator" onClick={this.equal}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
