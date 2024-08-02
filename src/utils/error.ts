
// const errorSheet =(data? :any) = {
//     aboutAlready: {
//         message: "About me already exists",
//         status: 400,
//     },
//     successfullyCreatedAboutMe: {
//         message: "Successfully created about me",
//         data: "{{data}}",
//         status: 400,
//     }
// }

const errorSheet = (data: any): any => ({
    aboutAlready: {
        message: "About me already exists",
        status: 400,
    },
    successfullyCreatedAboutMe: {
        message: `Successfully created about me. Data: ${JSON.stringify(data)}`,
        data,
        status: 200, 
    }
});