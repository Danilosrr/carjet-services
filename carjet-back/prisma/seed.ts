import { prisma } from "../src/config/database.js";
import { encrypt } from "../src/Utils/encryptUtils.js";

const branches = [
    { name:'filial 1', providerId:1, location: {lat:-7.1786392072688345, lng:-34.83703429614767}},
    { name:'filial 2', providerId:2, location: {lat:-7.128454017722097, lng:-34.86312917317562}},
    { name:'filial 3', providerId:3, location: {lat:-7.072320816924103, lng:-34.84276138545525}},
    { name:'filial 4', providerId:4, location: {lat:-7.0667796520529755, lng:-34.84883053158572}},
    { name:'filial 5', providerId:5, location: {lat:-7.241346278412283, lng:-35.89021354787413}},
    { name:'filial 6', providerId:6, location: {lat:-7.014509474877183, lng:-35.856612492032696}},
    { name:'filial 7', providerId:7, location: {lat:-8.119797509204886, lng:-34.899330599456306}}
]

const providers = [
    { name:'fornecedor 1', location: {lat:-7.127023881936732, lng:-34.888161689308575}},
    { name:'fornecedor 2', location: {lat:-7.165432820603746, lng:-34.85949423959635}},
    { name:'fornecedor 3', location: {lat:-7.169435340187172, lng:-34.84215644122669}},
    { name:'fornecedor 4', location: {lat:-7.154532164245924, lng:-34.84883053158572}},
    { name:'fornecedor 5', location: {lat:-7.241346278412283, lng:-34.84095481120161}},
    { name:'fornecedor 6', location: {lat:-7.09610703090226, lng:-34.834260017598844}},
    { name:'fornecedor 7', location: {lat:-7.097299454826352, lng:-34.84516051414306}}
]

const stock = [
    { name:'filme 1', info: "largura 1,90m", quantity: 10, providerId: 4},
    { name:'filme 2', info: "largura 1,90m", quantity: 10, providerId: 4},
    { name:'filme 3', info: "largura 800mm", quantity: 10, providerId: 4},
    { name:'filme 4', info: "largura 1m", quantity: 10, providerId: 4},
    { name:'filme 5', info: "largura 1m", quantity: 10, providerId: 4},
    { name:'filme 6', info: "largura 800mm", quantity: 10, providerId: 4},
    { name:'filme 7', info: "largura 1m", quantity: 10, providerId: 4},
    { name:'filme 8', info: "largura 1m", quantity: 10, providerId: 4},
    { name:'filme 15', info: "largura 1m", quantity: 10, providerId: 4},
    { name:'filme 16', info: "largura 800mm", quantity: 10, providerId: 4},
    { name:'filme 17', info: "largura 1m", quantity: 20, providerId: 1},
    { name:'filme 18', info: "largura 1m", quantity: 5, providerId: 1},
]

const services = [
    {
        code: 141,
        name: 'Produto 1',
        specification: 'Especificação 1',
        quantity: 5,
        providerId: 1,
    },
    {
        code: 253,
        name: 'Produto 2',
        specification: 'Especificação 2',
        quantity: 14,
        providerId: 1,
    },
    {
        code: 365,
        name: 'Produto 3',
        specification: 'Especificação 3',
        quantity: 23,
        providerId: 1,
    },
]

const users = [
    {
        email: 'teste@email.com',
        password: encrypt('senha'),
    }
]

async function main(){

    await prisma.provider.createMany({
        data: providers,
        skipDuplicates: true
    });

    await prisma.branch.createMany({
      data: branches,
      skipDuplicates: true
    });

    await prisma.stock.createMany({
        data: stock,
        skipDuplicates: true
    });

    await prisma.service.createMany({
        data: services,
        skipDuplicates: true
    });

    await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    });
}

main().catch( error => {
    console.log(error);
    process.exit(1);
}).finally( async () => {
    await prisma.$disconnect();
})