
import request from 'superagent';
import util from 'util';

export default function invite({ org, token, email, channel }, fn){
  let data = {
    email,
    token,
    channels: channel,
    set_active: true,
    _attempts: 1
  };

  console.log(`Requesting invite with data=${util.inspect(data)}`);

  request
  .post(`https://${org}.slack.com/api/users.admin.invite`)
  .type('form')
  .send(data)
  .end(function(err, res){
    console.log(`Invitation request response: err=${err} res=${util.inspect(res)}`);
    if (err) return fn(err);
    if (200 != res.status) {
      fn(new Error(`Invalid response ${res.status}.`));
      return;
    }
    fn(null);
  });
}
