let iframe = triggerGui.getElementsByClassName("unifyIframe")[0];
let u = new URL(triggerGuiData.url);
u.pathname = "/actionCreator";
iframe.src = u.href;

(async () => {
  await iframe.enableCombine("interaction");

  let dimensions = await iframe.combine.size();
  iframe.style.height = dimensions.height + "px";

  while (true) {
    await iframe.combine.resizeObserver();
    let dimensions = await iframe.combine.size();
    iframe.style.height = dimensions.height + "px";
  }
})();

getTriggerConfiguration(async () => {
  let action = await iframe.combine.getAction();
  return {
    text: "Execute Unify function: " + action.appName + " - " + action.method,
    data: action,
  };
});
