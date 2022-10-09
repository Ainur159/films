import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import {interfaces} from "inversify";
import BindingInWhenOnSyntax = interfaces.BindingInWhenOnSyntax;

const dependencyContainer = new Container();

let decorators = getDecorators(dependencyContainer);

export const lazyInject: (
  serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>
) => (proto: any, key: string) => void = decorators.lazyInject;

function bind<Interface>(identifier: string, concreteClass: {new (...args: any[]): Interface}): BindingInWhenOnSyntax<Interface> {
  return dependencyContainer.bind<Interface>(identifier).to(concreteClass);
}

export function bindSingleton<Interface>(identifier: string, concreteClass: {new (...args: any[]): Interface}) {
  bind<Interface>(identifier, concreteClass).inSingletonScope();
}

// myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
