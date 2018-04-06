import {
  appReducer,
  userFinishedAnnotation,
  userAnsweredClassification,
} from './app.reducer';
import {
  createMockGeometry,
  selectFirstTool,
  reduceActions,
} from './app.reducer.test';
import {
  selectLabelFromState,
  selectClassificationFieldsFromLabel,
} from './app.selectors';
import { screenText } from './customization';


// TODO finish these tests
describe('app.selectors', () => {
  describe('selectIntentFromMapClick', () => {
    it('should complete the bounding box if the user is currently drawing', () => {
      expect(1).toEqual(1);
    });
    it('should deselect an annotation if they arent clicking a new shape', () => {
      expect(1).toEqual(1);
    });
    it('should select a shape if they click on it', () => {
      expect(1).toEqual(1);
    });
    it('should return undefined if the click is on a blank map', () => {
      expect(1).toEqual(1);
    });
  });

  describe('selectLabelFromState', () => {
    it('should return a blank string if there are no labels', () => {
      expect(selectLabelFromState(appReducer())).toEqual('{}');
    });

    it('should return a segmentation as xy', () => {
      const state = appReducer(undefined);
      const geometry = createMockGeometry();
      const finalState = reduceActions(appReducer, [
        selectFirstTool(state),
        userFinishedAnnotation(geometry),
      ], state);
      expect(selectLabelFromState(finalState)).toEqual(JSON.stringify({
        Vegetation: [[
          {x: 0, y: 0},
          {x: 1, y: 0},
          {x: 0, y: 1},
          {x: 1, y: 1},
        ]]
      }));
    });


    it('should return classification items', () => {
      const state = appReducer(undefined);
      const fieldId = state.classificationFields[0].id;
      const finalState = reduceActions(appReducer, [
        selectFirstTool(state),
        userFinishedAnnotation(createMockGeometry()),
        userAnsweredClassification(fieldId, 'model_s')
      ], state);

      expect(selectLabelFromState(finalState)).toEqual(JSON.stringify({
        Vegetation: [[
          {x: 0, y: 0},
          {x: 1, y: 0},
          {x: 0, y: 1},
          {x: 1, y: 1},
        ]],
        model: 'model_s'
      }));
    });

  });

  describe('selectClassificationFieldsFromLabel', () => {
    // TODO
    it('should return fields if no option is provided', () => {
      const { classifications: [model, imageProblems] } =  screenText;
      expect(selectClassificationFieldsFromLabel(appReducer(), '')).toEqual([
        {...model,id: jasmine.any(String)},
        {...imageProblems,id: jasmine.any(String)},
      ]);
    });

    xit('should be able to return the classifcations fields given a label', () => {
      const label = JSON.stringify({
        model: 'model_s',
        image_problems: ['blur', 'saturated']
      })
      const { classifications: [model, imageProblems] } =  screenText;
      expect(selectClassificationFieldsFromLabel(appReducer(), label)).toEqual([
        {...model, userAnswer: 'model_s'},
        {...imageProblems, userAnswer: ['blur', 'saturated']},
      ]);
    })
  });

});