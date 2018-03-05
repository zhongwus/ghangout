$.Velocity.RegisterEffect('transition.pushRightIn',{
  defaultDuration:500,
  calls:[
    [{translateX: ['0%', '100%'], translateZ: 0, easing: "ease-in-out", opacity: [1, 1]}]
  ]
});

$.Velocity.RegisterEffect('transition.pushLeftOut',{
  defaultDuration:500,
  calls:[
    [{translateX: ['-100%', '0%'], translateZ: 0, easing: "ease-in-out", opacity: [1, 1]}]
  ]
});

$.Velocity.RegisterEffect('transition.pushLeftIn',{
  defaultDuration: 500,
  calls: [
    [{translateX: ['0%', '-100%'], translateZ: 0, easing: "ease-in-out", opacity: [1, 1]}]
  ]
});

$.Velocity.RegisterEffect('transition.pushRightOut', {
  defaultDuration: 500,
  calls: [
    [{translateX: ['100%', '0%'], translateZ: 0, easing: "ease-in-out", opacity: [1, 1]}]
  ]
});

$.Velocity.RegisterEffect('transition.pushDownIn', {
  defaultDuration: 500,
  calls: [
    [{translateY: ['0%', '100%'], translateZ: 0, easing: "ease-in-out", opacity: [1, 1]}]
  ]
});

$.Velocity.RegisterEffect('transition.pushUpOut', {
  defaultDuration: 500,
  calls: [
    [{translateY: ['-100%', '0%'], translateZ: 0, easing: "ease-in-out", opacity: [1, 1]}]
  ]
});

$.Velocity.RegisterEffect('transition.pushUpIn', {
  defaultDuration: 500,
  calls: [
    [{translateY: ['0%', '-100%'], translateZ: 0, easing: "ease-in-out", opacity: [1, 1]}]
  ]
});

$.Velocity.RegisterEffect('transition.pushDownOut', {
  defaultDuration: 500,
  calls: [
    [{translateY: ['100%', '0%'], translateZ: 0, easing: "ease-in-out", opacity: [1, 1]}]
  ]
});

// from index
Transitioner.transition({
  fromRoute:'index',
  toRoute:'login',
  velocityAnimation:{
    in:['transition.pushDownIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'index',
  toRoute:'registerEmail',
  velocityAnimation:{
    in:['transition.pushDownIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

// from register
Transitioner.transition({
  fromRoute:'registerPhone',
  toRoute:'index',
  velocityAnimation:{
    in:['transition.pushUpIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'registerEmail',
  toRoute:'index',
  velocityAnimation:{
    in:['transition.pushUpIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'registerPhone',
  toRoute:'registerEmail',
  velocityAnimation:{
    in:['transition.fadeIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'registerEmail',
  toRoute:'registerPhone',
  velocityAnimation:{
    in:['transition.fadeIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'registerPhone',
  toRoute:'completeProfile',
  velocityAnimation:{
    in:['transition.slideRightBigIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.slideLeftBigOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'registerEmail',
  toRoute:'completeProfile',
  velocityAnimation:{
    in:['transition.slideRightBigIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.slideLeftBigOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

//from login
Transitioner.transition({
  fromRoute:'login',
  toRoute:'index',
  velocityAnimation:{
    in:['transition.pushUpIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'login',
  toRoute:'home',
  velocityAnimation:{
    in:['transition.fadeIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

//from home
Transitioner.transition({
  fromRoute:'home',
  toRoute:'index',
  velocityAnimation:{
    in:['transition.fadeIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'home',
  toRoute:'grouplist',
  velocityAnimation:{
    in:['transition.fadeIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

//from completeProfile
Transitioner.transition({
  fromRoute:'completeProfile',
  toRoute:'index',
  velocityAnimation:{
    in:['transition.fadeIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

//from grouplist
/*Transitioner.transition({
  fromRoute:'grouplist',
  toRoute:'grouplist',
  velocityAnimation:{
    in:['transition.fadeIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});*/

Transitioner.transition({
  fromRoute:'grouplist',
  toRoute:'addGroup',
  velocityAnimation:{
    in:['transition.pushDownIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'grouplist',
  toRoute:'chatRoom',
  velocityAnimation:{
    in:['transition.slideRightBigIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.slideLeftBigOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

//from chatroom
Transitioner.transition({
  fromRoute:'chatRoom',
  toRoute:'grouplist',
  velocityAnimation:{
    in:['transition.slideLeftBigIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.slideRightBigOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'chatRoom',
  toRoute:'myGroups',
  velocityAnimation:{
    in:['transition.slideLeftBigIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.slideRightBigOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

//from addGroup
Transitioner.transition({
  fromRoute:'addGroup',
  toRoute:'grouplist',
  velocityAnimation:{
    in:['transition.pushUpIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'addGroup',
  toRoute:'myGroups',
  velocityAnimation:{
    in:['transition.pushUpIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

//from myGroups
Transitioner.transition({
  fromRoute:'myGroups',
  toRoute:'chatRoom',
  velocityAnimation:{
    in:['transition.slideRightBigIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.slideLeftBigOut',{duration: 250, easing: 'ease-in-out'}]
  }
});

Transitioner.transition({
  fromRoute:'myGroups',
  toRoute:'addGroup',
  velocityAnimation:{
    in:['transition.pushDownIn',{duration: 250, easing: 'ease-in-out'}],
    out:['transition.fadeOut',{duration: 250, easing: 'ease-in-out'}]
  }
});
