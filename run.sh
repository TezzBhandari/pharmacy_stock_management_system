echo "generating migration"
pnpm run db:generate 

echo "pusing migration"
pnpm run db:migrate 

echo "stating server"
nodemon  ./src/server.ts
