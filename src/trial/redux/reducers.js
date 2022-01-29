
import * as ActionTypes from './index';

import { movies } from '../_db_';

function HL(a,b){
  return (b - a)
};

function LH(a,b){
  return (a - b)
};
       
export const Movies = ( state = [], action) =>{

        const { type, payload, key } = action;

         const states = state.map(item=>item.price);

switch(type) {

	case ActionTypes.GET_DATA:{
    return [...payload]
  }

   case ActionTypes.HIGH_LOW:{
            try{   
                  const prices = states.sort(HL);
                  let HighToLowState = []
                   movies.map((item,index)=>{
                             movies.filter((find)=>find.price === prices[index] ? HighToLowState.push(find) :null)
                               return state = [];
                         });
                   return HighToLowState;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }
            case ActionTypes.LOW_HIGH:{
            try{   
                  const prices = states.sort(LH);
                   let LowToHighState = [];
                   movies.map((item,index)=>{
                         movies.filter((find)=>{
                            if(find.price === prices[index]){
                               LowToHighState.push(find);
                            }
                            return state = [];                            
                         });
                   });
                  return LowToHighState;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }
            case ActionTypes.NEWEST:{
            try{   
                   let newestCreated = [];
                             movies.filter((find)=>{
                                if(find.status === "NEWEST"){
                                   newestCreated.push(find);
                              }   
                             return state = [];
                 });
                   return newestCreated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }
              case ActionTypes.FEATURED:{
            try{   
                   let featuredCreated = [];
                         movies.filter((find)=>{
                                if(find.status === 'featured'){
                                   featuredCreated.push(find);
                              }
                            return state = [];
                         })
                   return featuredCreated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }
             
             case ActionTypes.DVD_TYPE:{
            try{   
                   let dvdCreated = [];
                         movies.filter((find,index)=>{
                           if(find.status === "DVD"){
                               
                              dvdCreated.push(find);
                           }
                           return state = [];
                         })
                   return dvdCreated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

             case ActionTypes.CD_TYPE:{
            try{   
                   let cdCreated = [];
                         movies.filter((find)=>{
                           if(find.status === "CD"){
                              cdCreated.push(find);
                           }
                            return state = [];
                         })
                   return cdCreated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }
            case ActionTypes.BELOW_100:{
            try{   
                   let priceBelow100 = [];
                         movies.filter((find)=>{
                           if(find.price <= 100){
                              priceBelow100.push(find);
                           }
                         return state = [];
                         })
                   return priceBelow100;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }
              case ActionTypes.BETWEEN_100_200:{
            try{   
                   let priceBetween_100_200 = [];
                         movies.filter((find)=>{
                           if(find.price > 100 && find.price <= 200){
                              priceBetween_100_200.push(find);
                           }
                            return state = [];
                         })
                   return priceBetween_100_200;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }
              case ActionTypes.ABOVE_200:{
            try{   
                   let priceAbove_200 = [];
                         movies.filter((find)=>{
                           if(find.price > 200){
                              priceAbove_200.push(find);
                           }
                         return state = [];
                         })
                   return priceAbove_200;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

              case ActionTypes.FIVE_STAR:{
            try{   
                   let fivestar = [];
                         movies.filter((find)=>{
                           if(find.ratingValue === 5){
                              fivestar.push(find);
                           }
                            return state = [];                              
                         })
                   return fivestar;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

               case ActionTypes.FOUR_STAR:{
            try{   
                   let fourstar = [];
                         movies.filter((find)=>{
                           if(find.ratingValue === 4){
                              fourstar.push(find);
                           }
                           return state = [];
                         })
                   return fourstar;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

              case ActionTypes.THREE_STAR:{
            try{   
                   let threestar = [];
                         movies.filter((find)=>{
                           if(find.ratingValue === 3){
                              threestar.push(find);
                           }
                           return state = [];
                         })
                   return threestar;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

               case ActionTypes.TWO_STAR:{
            try{   
                   let twostar = [];
                         movies.filter((find)=>{
                           if(find.ratingValue === 2){
                              twostar.push(find);
                           }
                            return state = [];
                         })
                   return twostar;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

              case ActionTypes.ONE_STAR:{
            try{   
                   let onestar = [];
                         movies.filter((find)=>{
                           if(find.ratingValue === 1){
                              onestar.push(find);
                           }
                            return state = [];
                         })
                   return onestar;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

               case ActionTypes.DRAMA:{
            try{   
                   let dramaReated = [];
                         movies.filter((find)=>{
                           if(find.type === "drama"){
                              dramaReated.push(find);
                           }
                            return state = [];
                         })
                   return dramaReated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

                case ActionTypes.COMEDY:{
            try{   
                   let comedyCreated = [];
                         movies.filter((find)=>{
                           if(find.type === "comedy"){
                              comedyCreated.push(find);
                           }
                            return state = [];
                         })
                   return comedyCreated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

               case ActionTypes.ACTION:{
            try{   
                   let actionCreated = [];
                         movies.filter((find)=>{
                           if(find.type === "action"){
                              actionCreated.push(find);
                           }
                           return state = [];
                         })
                   return actionCreated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

               case ActionTypes.SUSPENSE:{
            try{   
                   let suspenseCreated = [];
                         movies.filter((find)=>{
                           if(find.type === "suspense"){
                              suspenseCreated.push(find);
                           }
                            return state = [];
                         })
                   return suspenseCreated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

               case ActionTypes.HORROR:{
            try{   
                   let horrorCreated = [];
                         movies.filter((find)=>{
                           if(find.type === "horror"){
                              horrorCreated.push(find);
                           }
                            return state = [];
                         })
                   return horrorCreated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

                case ActionTypes.CARTOONS:{
            try{   
                   let cartoonsCreated = [];
                         movies.filter((find)=>{
                           if(find.type === "cartoons"){
                              cartoonsCreated.push(find);
                           }
                            return state = [];
                         })
                   return cartoonsCreated;
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }
               case ActionTypes.ALL:{
            try{   
                 return [...movies];
               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

              case ActionTypes.SEARCHDATA:{
                const newSearchValue = []
            try{   
              console.log(key);
                 movies.filter(item=>{
                    if(key.toString().toLowerCase() == item.title.toString().toLowerCase() ||
                       key.toString().toLowerCase() == item.status.toString().toLowerCase()||
                       key.toString().toLowerCase() == item.price.toString().toLowerCase() ||
                       key.toString().toLowerCase() == item.type.toString().toLowerCase()  ||
                       key.toString().toLowerCase() == item.ratingValue.toString().toLowerCase() 
                       ){
                        newSearchValue.push(item);
                    }else if(item.title.toString().toLowerCase() > -1 == key){
                        newSearchValue.push(item);
                    }
                 })   

                return newSearchValue;

               }catch(err){
                  console.error(err.stock);
               }    
               break;
            }

    default:return state;
  }  
};

export const NameTag = (state = [], action) => {

    const { type } = action;

    switch(type){
                   
        case ActionTypes.GET_DATA:return ['ALL MOVIES'];break;

        case ActionTypes.FEATURED:{return ['FEATURED'];break;}

        case ActionTypes.HIGH_LOW:{return ['Ascending Price'];break;}

        case ActionTypes.LOW_HIGH:{return ['Descending Price'];break;}

        case ActionTypes.DVD_TYPE:{return ['DVD BRAND'];break;}

        case ActionTypes.CD_TYPE:{return ['CD BRAND'];break;}

        case ActionTypes.ACTION:{return ['ACTION & ADVENTURE'];break;}

        case ActionTypes.NEWEST:{return ['NEWEST MOVIE'];break;}

        case ActionTypes.DRAMA:{return ['DRAMA'];break;}

        case ActionTypes.COMEDY:{return ['COMEDY'];break;}

        case ActionTypes.SUSPENSE:{return ['SUSPENSE'];break;}

        case ActionTypes.HORROR:{return ['HORROR'];break;}

        case ActionTypes.BELOW_100:{return ['HIGH QUALITY HD'];break;}

        case ActionTypes.BETWEEN_100_200:{return ['MP4 Format'];break;}

        case ActionTypes.ABOVE_200:{return ['HD MOVIES'];break;}

        case ActionTypes.FIVE_STAR:{return ['MOST RENTED'];break;}

        case ActionTypes.FOUR_STAR:{return ['BEST RENTED'];break;}

        case ActionTypes.THREE_STAR:{return ['MORE RENTED'];break;}

        case ActionTypes.TWO_STAR:{return ['LESS RENTED'];break;}

        case ActionTypes.ONE_STAR:{return ['RARELY RENTED'];break;}

        case ActionTypes.CARTOONS:{return ['CARTOONS'];break;}

        case ActionTypes.ALL:{return ['ALL MOVIES'];break;}

         default:return ['NEWEST'];
  }
       
}