
import *as actionTypes from './actionTypes';

export function GetData(payload){
	   try{
          return {
          	type:actionTypes.GET_DATA,
          	payload,
          }
	   }catch(err){
	   	console.error('Error',err.stack);
	   }
}

export function HighLow(){
	   try{
          return {
          	type:actionTypes.HIGH_LOW,
          }
	   }catch(err){
	   	console.error('Error',err.stack);
	   }
}

export function LowHigh(){
	   try{
			return{
				type:actionTypes.LOW_HIGH,
			}
         // return Promise.resolve(resolve=>resolve);       
	   }catch(err){
	   	console.error('Error',err.stack);
	   }
}

export function Below100(){
	   try{
			return{
				type:actionTypes.BELOW_100,
			}
         // return Promise.resolve(resolve=>resolve);       
	   }catch(err){
	   	console.error('Error',err.stack);
	   }
}

export function SearchData(key){
	console.log('from search data: ',key);
	  try{
	  	return {
	  		type:actionTypes.SEARCHDATA,
	  		key,
	  	}
	  }catch(err){
	  	console.error('Error in searching ',err);
	  }
}