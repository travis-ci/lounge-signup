
import request from 'superagent';
import inspect from 'util';

export default function invite({ org, token, email, channel }, fn){
  let data = {
    email,
    token,
    channels: channel,
    set_active: true,
    _attempts: 1
  };

  console.log(`Requesting invite with data=${inspect(data)}`);

  request
  .post(`https://${org}.slack.com/api/users.admin.invite`)
  .type('form')
  .send(data)
  .end(function(err, res){
    console.log(`Invitation request response: err=${err} res=${inspect(res)}`);
    if (err) return fn(err);
    if (200 != res.status) {
      fn(new Error(`Invalid response ${res.status}.`));
      return;
    }
    fn(null);
  });
}
