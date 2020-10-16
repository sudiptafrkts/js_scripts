echo 'enter eb application name'
read choice;
echo `aws ec2 --region aws --region us-east-1 describe-instances --filters "Name=instance-state-name,Values=running" "Name=key-name,Values=$choice" | jq ".Reservations[0].Instances[0].NetworkInterfaces[0].PrivateIpAddress" | sed 's/"//g'`
