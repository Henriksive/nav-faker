import moment = require('moment');
import navfaker from '../index';

test('Generer gyldig fødselsnummer', () => {
    const faker = navfaker;
    expect(faker.fødselsnummer.generer()).toHaveLength(11);
});

test('Generer myndig fødselsnummer', () => {
    const fødselsnummer = navfaker.fødselsnummer.myndig();

    const fødselsdato = navfaker.fødselsnummer.getFødselsdato(fødselsnummer);
    const alder = moment().diff(moment(fødselsdato), 'years');

    expect(alder).toBeLessThanOrEqual(100);
    expect(alder).toBeGreaterThanOrEqual(18);
});

test('Parser fødselsdato', () => {
    const fødselsdato = navfaker.fødselsnummer.getFødselsdato('10108000398');

    expect(fødselsdato.getFullYear()).toEqual(1980);
    expect(fødselsdato.getDate()).toEqual(10);
    expect(fødselsdato.getMonth()).toEqual(9);
});

test('Lager d-nummer', () => {
    const dnummer = navfaker.fødselsnummer.dnummer();
    const førsteSiffer = Number(dnummer.charAt(0));

    expect(dnummer.length).toEqual(11);
    expect(førsteSiffer).toBeGreaterThanOrEqual(4);
    expect(førsteSiffer).toBeLessThanOrEqual(7);
});
