import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/jackdenio.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'bol666',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-24T16:00:00.862Z',
      firstTeamCode: 'BR',
      secondTeamCode: 'RS',

    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-28T13:00:00.862Z',
      firstTeamCode: 'BR',
      secondTeamCode: 'CH',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 0,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
      
    }
  })  

}

main()