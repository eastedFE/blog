1.认证

2.镜像

3.计算

4.网络

环境要求：
控制节点 1核 4GB 5GB
计算节点 1核 2GB 10GB

10.10.129.109
10.10.129.113


管理节点：
cd /etc/sysconfig/network-scripts/
ls
vi ifcfg-INTERFACE_NAME

TYPE="Ethernet"
BOOTPROTO="dhcp"
DEFROUTE="yes"
NAME="eth0"
DEVICE="eth0"
ONBOOT="yes"

设置域名
cd /etc
vi hosts








