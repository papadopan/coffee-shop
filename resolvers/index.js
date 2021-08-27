let cooks = []
let waiters = []
let employees = []
export const resolvers = {
  Query: {
    cooks: ()=>{
      return cooks
    },
    waiters: ()=>{
      return waiters
    },
    users: ()=> {
      return employees
    }

  },
  Mutation:{
    addCook: (_, {input})=>{
      cooks.push(input)
      employees.push(input)
      return input
    },
    addWaiter: (_, {input})=>{
      waiters.push(input)
      employees.push(input)
      return input
    }
  },
  User: {
    __resolveType(user){
      console.log(user)
      if(user.id) return "Waiter"
      return "Cook"
    }
  }
}