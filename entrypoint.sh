#!/bin/bash

docker exec -it nest-app npx prisma migrate dev

docker exec -it nest-app npx prisma db push

exec "$@"