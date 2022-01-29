
import moviesinfo from './db2';

import faker from 'faker';

import  { sample}  from 'lodash';

import { fCurrency } from '../utils/formatNumber';

import { dbImgAvatar, dbImgCover, dbImgProduct } from '../utils';

 const users = [...Array(24)].map((_,index) => ({
	id:faker.datatype.uuid(),
	avatarUrl:dbImgAvatar(index + 1),
	company:faker.company.companyName(),
	isVerified:faker.datatype.boolean(),
	status:sample(['active','banned']),
	role:sample([
		'Leader',
		'HR Manager',
		'UI Designer',
		'UX Design',
		'UI/UX Designer',
		'Project Manager',
		'Backedn Developer',
		'FullStack Developer',
		'Frontend Developer',
		'FullStack Designer'
		])
}));

 const account = {
	displayName:'Tres Paylas',
	email:'paylastres@gmail.com',
	photoUrl:'../../static/mock-images/avatar_defaults.jpg',
};


 const  MOVIES_TITLE = [
  'Whiteboard Templates By Industry Leaders',
  'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
  'Designify Agency Landing Page Design',
  '✨What is Done is Done ✨',
  'Fresh Prince',
  'Six Socks Studio',
  'vincenzo de cotiis’ crossing over showcases a research on contamination',
  'Simple, Great Looking Animations in Your Project | Video Tutorial',
  '40 Free Serif Fonts for Digital Designers',
  'Examining the Evolution of the Typical Web Design Client',
  'Katie Griffin loves making that homey art',
  'The American Dream retold through mid-century railroad graphics',
  'Illustration System Design',
  'CarZio-Delivery Driver App SignIn/SignUp',
  'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
  'Tylko Organise effortlessly -3D & Motion Design',
  'RAYO ?? A expanded visual arts festival identity',
  'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
  'Inside the Mind of Samuel Day',
  'Portfolio Review: Is This Portfolio Too Creative?',
  'Akkers van Margraten',
  'Gradient Ticket icon',
  'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
  'How to Animate a SVG with border-image'
   
];

  const posts = [...Array(23)].map((_,index) => ({
  	     id:moviesinfo.id,
  	     cover:dbImgCover(index + 1),
  	     title: MOVIES_TITLE[index + 1], 
  	     createdAt:faker.date.past(),
  	     view:faker.datatype.number(),
  	     comments:faker.datatype.number(),
  	     share:faker.datatype.number(),
  	     favorite:faker.datatype.number(),
         author: {
         	name:faker.name.findName(),
         	avatarUrl:`../../static/mock-images/avatars/avatar_${index + 1}.jpg`
         }
  }));

const PRODUCT_NAME = [
  'Nike Air Force 1 NDESTRUKT',
  'Nike Space Hippie 04',
  'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
  'Nike Blazer Low 77 Vintage',
  'Nike ZoomX SuperRep Surge',
  'Zoom Freak 2',
  'Nike Air Max Zephyr',
  'Jordan Delta',
  'Air Jordan XXXV PF',
  'Nike Waffle Racer Crater',
  'Kyrie 7 EP Sisterhood',
  'Nike Air Zoom BB NXT',
  'Nike Air Force 1 07 LX',
  'Nike Air Force 1 Shadow SE',
  'Nike Air Zoom Tempo NEXT%',
  'Nike DBreak-Type',
  'Nike Air Max Up',
  'Nike Air Max 270 React ENG',
  'NikeCourt Royale',
  'Nike Air Zoom Pegasus 37 Premium',
  'Nike Air Zoom SuperRep',
  'NikeCourt Royale',
  'Nike React Art3mis',
  'Nike React Infinity Run Flyknit A.I.R. Chaz Bear'
];

const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

// const info = [...moviesinfo].map(item=>item.title);

const item = [...moviesinfo].map(item=>item);

const imgArray = [...moviesinfo].map(item=>item.cover);

const movies = [...moviesinfo].map((item, index) => {

const setIndex = index + 1;
  
      return {
           id: faker.datatype.uuid(),
        cover: item.cover,
        title: item.title,
        price: item.price,
         type: item.type,
    createdAt:faker.date.past(),
  ratingValue:sample([1,2,3,4,5]),
    priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
   imgPreview:
              (setIndex === (index + 1) && (imgArray.slice(index,setIndex + 15)
                || imgArray.slice(setIndex,index+5)
                || imgArray.slice(setIndex,index+ 25)
                || imgArray.slice(setIndex,index+ 10)
              )),
       status: sample(['CD', 'DVD','NEWEST','featured'])
      };
});

export {
	users,
	account,
	posts,
	movies,
};

// .filter( img =>
//                   img === moviesinfo[index].cover ?
//                   initial.push(moviesinfo[index].cover) ? initial : null : null )



