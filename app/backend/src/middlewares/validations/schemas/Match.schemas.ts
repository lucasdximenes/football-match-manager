import * as joi from 'joi';

const newMatchBody = joi.object({
  homeTeamId: joi.number().required().messages({
    'any.required': 'homeTeamId is required',
    'number.base': 'homeTeamId must be a number',
  }),
  awayTeamId: joi.number().required().messages({
    'any.required': 'awayTeamId is required',
    'number.base': 'awayTeamId must be a number',
  }),
  homeTeamGoals: joi.number().required().messages({
    'any.required': 'homeTeamGoals is required',
    'number.base': 'homeTeamGoals must be a number',
  }),
  awayTeamGoals: joi.number().required().messages({
    'any.required': 'awayTeamGoals is required',
    'number.base': 'awayTeamGoals must be a number',
  }),
  user: joi.object(),
});

export default newMatchBody;
