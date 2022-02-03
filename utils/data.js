import bcrypt from 'bcrypt'

const data = {
    users:[
        {
            name:"john doe",
            email:"admin@exam.com",
            password:bcrypt.hashSync("123456",10),
            isAdmin:true,
        },
        {
            name:"jane doe",
            email:"jaohn@exam.com",
            password:bcrypt.hashSync("123456", 10),
            isAdmin:false,
        },
        {
            name:"doir",
            email:"einstein@exam.com",
            password:bcrypt.hashSync("123456",10),
            isAdmin:false,
        },

    ],
    products:[
        {
            name:'mechi',
            slug:'mechi',
            category:"river",
            image:"/images/1.jpg",
            price:47812,
            brand:'M3g',
            rating:3.5,
            numReviews:10,
            countInStock:12,
            description:'named after the mechi river'
        },
        {
            name:'koshi',
            slug:'koshi',
            category:"river",
            image:"/images/2.jpg",
            price:45900,
            brand:'K05',
            rating:4.5,
            numReviews:130,
            countInStock:52,
            description:'named after the koshi river'
        },
        {
            name:'sagarmatha',
            slug:'sagarmatha',
            category:"himal",
            image:"/images/3.jpg",
            price:4512345,
            brand:'Mt.E',
            rating:1.5,
            numReviews:1,
            countInStock:5,
            description:'named after sagarmatha'
        },
        {
            name:'janakpur',
            slug:'janakpur',
            category:"temple",
            image:"/images/4.jpg",
            price:18975,
            brand:'St@',
            rating:2.5,
            numReviews:190,
            countInStock:112,
            description:'named after city'
        },
        {
            name:'bagmati',
            slug:'bagmati',
            category:"river",
            image:"/images/5.jpg",
            price:1897534,
            brand:'L0d',
            rating:2.9,
            numReviews:190,
            countInStock:112,
            description:'named after river'
        },
        {
            name:'narayani',
            slug:'narayani',
            category:"river",
            image:"/images/6.jpg",
            price:128975,
            brand:'N45',
            rating:2.5,
            numReviews:990,
            countInStock:12,
            description:'named after river'
        },
        {
            name:'gandaki',
            slug:'gandaki',
            category:"river",
            image:"/images/7.jpg",
            price:678975,
            brand:'N45',
            rating:3.4,
            numReviews:90,
            countInStock:212,
            description:'named after river'
        },
        {
            name:'Lumbini',
            slug:'lumbini',
            category:"temple",
            image:"/images/8.jpg",
            price:99075,
            brand:'L945',
            rating:4.4,
            numReviews:40,
            countInStock:92,
            description:'named after temple'
        },
        {
            name:'dhaulagiri',
            slug:'dhaulagiri',
            category:"himal",
            image:"/images/9.jpg",
            price:345075,
            brand:'D445',
            rating:1.4,
            numReviews:40,
            countInStock:32,
            description:'named after himal'
        },
        {
            name:'karnali',
            slug:'karnali',
            category:"river",
            image:"/images/8.jpg",
            price:99075,
            brand:'L945',
            rating:4.4,
            numReviews:40,
            countInStock:92,
            description:'named after river'
        },
        {
            name:'rapti',
            slug:'rapti',
            category:"river",
            image:"/images/7.jpg",
            price:99075,
            brand:'L945',
            rating:4.4,
            numReviews:40,
            countInStock:92,
            description:'named after river'
        },
        {
            name:'bheri',
            slug:'bheri',
            category:"river",
            image:"/images/6.jpg",
            price:99075,
            brand:'L945',
            rating:4.4,
            numReviews:40,
            countInStock:92,
            description:'named after river'
        },
        {
            name:'seti',
            slug:'seti',
            category:"river",
            image:"/images/5.jpg",
            price:99075,
            brand:'L945',
            rating:4.4,
            numReviews:40,
            countInStock:92,
            description:'named after river'
        },
        {
            name:'mahakali',
            slug:'mahakali',
            category:"river",
            image:"/images/8.jpg",
            price:923275,
            brand:'L945',
            rating:3.4,
            numReviews:40,
            countInStock:34,
            description:'named after river'
        },
        
    ]
};
export default data;