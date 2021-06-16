import Layout from "@/layout"

const routes = [
    {
        path: "/",
        component: Layout,
        redirect: "/",
        children: [
            {
                path: "/",
                name: "home",
                component:()=> import("@/views/Index.vue")
            },
            {
                path: "/transaction",
                name: "transaction",
                component: ()=> import("@/views/transaction/Index")
            },
            {
                path: "/transactionDetail",
                name: "transactionDetail",
                meta: {
                    keepAlive: true
                },
                component: ()=> import("@/views/transaction/Detail")
            },
            {
                path: "/block",
                name: "block",
                component: ()=> import("@/views/block/Index")
            },
            {
                path: "/blockDetail",
                name: "blockDetail",
                meta: {
                    keepAlive: true
                },
                component: ()=> import("@/views/block/Detail")
            },
            {
                path: "/contract",
                name: "contract",
                component: ()=> import("@/views/contract/Index")
            },
            {
                path: "/contractDetail",
                name: "contractDetail",
                component: ()=> import("@/views/contract/Detail")
            },
            {
                path: "/account",
                name: "account",
                component: ()=> import("@/views/account/Index")
            },
            {
                path: "/accountDetail",
                name: "accountDetail",
                component: ()=> import("@/views/account/Detail")
            },
            {
                path: "/vote",
                name: "vote",
                component: ()=> import("@/views/vote/Index")
            },
            {
                path: "/faucet",
                name: "faucet",
                component: ()=> import("@/views/faucet/Index")
            },
            {
                path: "/docs",
                name: "docs",
                component: ()=> import("@/views/docs/Index")
            },
        ]
    },
    {
        path: "*",
        redirect: "/404",
    },
    {
        path: "/404",
        name: "404",
        component: ()=> import("@/views/404.vue")
    }
]
export default routes
