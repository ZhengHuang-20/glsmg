echo '用户名： '
rsync -rvP --delete -e 'ssh -p 22' ../dist/test/* root@82.157.136.170:/www/wwwroot/admin.dp.jiefang.com
