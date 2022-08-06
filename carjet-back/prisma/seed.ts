import { prisma } from "../src/config/database.js";

const branches = [
    { name:'filial 1', location: {lat:-7.1786392072688345, lng:-34.83703429614767}},
    { name:'filial 2', location: {lat:-7.128454017722097, lng:-34.86312917317562}},
    { name:'filial 3', location: {lat:-7.072320816924103, lng:-34.84276138545525}},
    { name:'filial 4', location: {lat:-7.0667796520529755, lng:-34.84883053158572}},
    { name:'filial 5', location: {lat:-7.241346278412283, lng:-35.89021354787413}},
    { name:'filial 6', location: {lat:-7.014509474877183, lng:-35.856612492032696}},
    { name:'filial 7', location: {lat:-8.119797509204886, lng:-34.899330599456306}}
]

const providers = [
    { name:'fornecedor 1', location: {lat:-7.127023881936732, lng:-34.888161689308575}},
    { name:'fornecedor 2', location: {lat:-7.165432820603746, lng:-34.85949423959635}},
    { name:'fornecedor 3', location: {lat:-7.169435340187172, lng:-34.84215644122669}},
    { name:'fornecedor 4', location: {lat:-7.154532164245924, lng:-34.84883053158572}},
    { name:'fornecedor 5', location: {lat:-7.241346278412283, lng:-34.84095481120161}},
    { name:'fornecedor 6', location: {lat:-7.09610703090226, lng:-34.834260017598844}},
    { name:'fornecedor 7', location: {lat:-7.097299454826352, lng:-34.84516051414306}},
    { name:'fornecedor 8', location: {lat:-7.12261757851639, lng:-34.87016896619387}}
]

async function main(){

    await prisma.branch.createMany({
      data: branches,
      skipDuplicates: true
    });

    await prisma.provider.createMany({
        data: providers,
        skipDuplicates: true
    });
    
}

main().catch( error => {
    console.log(error);
    process.exit(1);
}).finally( async () => {
    await prisma.$disconnect();
})