echo '用户名： '
rsync -rvP --delete -e 'ssh -p 22' ../dist/prod/* root@82.157.136.170:/www/wwwroot/admin.gls.com
