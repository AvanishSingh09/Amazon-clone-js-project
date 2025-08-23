import { formatcurrency } from "../../script/utils/money.js";

describe('test suite:formatcurrency',() => {
 it('convert cents into dollars',() => {
   expect(formatcurrency(2095)).toEqual('20.95');
 });
 it('works with zero',()=>{
  expect(formatcurrency(0)).toEqual('0.00');
 })
  it('round up to nearest cent',()=>{
  expect(formatcurrency(2000.5)).toEqual('20.01');
 })
});