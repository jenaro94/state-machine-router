function createMachine(machineDefinition, onMachineTransition) {
  const initialState = Object.keys(machineDefinition)[0];
  const machine = {
    value: initialState,
    finished: false,
    onMachineTransition: onMachineTransition,
    transition: (currentState, event) => {
      if (machine.finished)
        return console.error(
          `Your machine is on a finished state and should not be transitioned anymore`
        );

      const currentStateDefinition = machineDefinition[currentState];
      if (!currentStateDefinition)
        return console.error(`You entered an undefined state ${currentState}.`);

      const currentStateTransitions = currentStateDefinition.transitions;
      if (!currentStateTransitions) {
        machine.finished = true;
        return machine.value;
      }

      const currentStateTransition = currentStateTransitions[event];
      if (!currentStateTransition) {
        console.error(
          `Your transition ${event} does not exist on ${currentState}!`
        );
        return 'error';
      }

      const newState = currentStateTransition.target;
      const newStateDefinition = machineDefinition[newState];

      if (currentStateTransition.action) {
        currentStateTransition.action(currentState, newState);
      }

      if (
        currentStateDefinition.actions &&
        currentStateDefinition.actions.onExit
      ) {
        currentStateDefinition.actions.onExit(currentState, newState);
      }

      if (newStateDefinition.actions && newStateDefinition.actions.onEnter) {
        newStateDefinition.actions.onEnter(currentState, newState);
      }

      machine.value = newState;
      if (machine.onMachineTransition) {
        machine.onMachineTransition(currentState, newState);
      }

      return machine.value;
    },
  };

  return machine;
}

export default createMachine;
