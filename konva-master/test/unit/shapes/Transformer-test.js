suite('Transformer', function() {
  // ======================================================
  test('init transformer on simple rectangle', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 100,
      y: 60,
      draggable: true,
      width: 100,
      height: 100,
      fill: 'yellow'
    });
    layer.add(rect);

    var tr = new Konva.Transformer({
      node: rect
    });
    layer.add(tr);

    layer.draw();
    assert.equal(tr.getClassName(), 'Transformer');

    assert.equal(tr.x(), rect.x());
    assert.equal(tr.y(), rect.y());
    assert.equal(tr.width(), rect.width());
    assert.equal(tr.height(), rect.height());

    // manual check of correct position of node
    var handler = tr.findOne('.bottom-right');
    var pos = handler.getAbsolutePosition();
    assert.equal(pos.x, rect.x() + rect.width());
    assert.equal(pos.y, rect.y() + rect.height());
  });

  test('try to fit simple rectangle', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 100,
      y: 60,
      draggable: true,
      width: 100,
      height: 100,
      fill: 'yellow'
    });
    layer.add(rect);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(rect);

    layer.draw();

    tr._fitNodeInto({
      x: 120,
      y: 60,
      width: 50,
      height: 50,
      rotation: 45
    });

    assert.equal(tr.x(), rect.x());
    assert.equal(tr.y(), rect.y());
    assert.equal(tr.width(), 50);
    assert.equal(tr.height(), 50);
    assert.equal(tr.rotation(), rect.rotation());
  });

  test('listen shape changes', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      draggable: true,
      fill: 'yellow'
    });
    layer.add(rect);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(rect);

    layer.draw();
    assert.equal(tr.getClassName(), 'Transformer');

    rect.setAttrs({
      x: 50,
      y: 50,
      width: 100,
      height: 100
    });
    layer.draw();
    assert.equal(tr.x(), rect.x());
    assert.equal(tr.y(), rect.y());
    assert.equal(tr.width(), rect.width());
    assert.equal(tr.height(), rect.height());
  });

  test('add transformer for transformed rect', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 150,
      y: 60,
      draggable: true,
      width: 100,
      height: 100,
      fill: 'yellow',
      rotation: 90,
      scaleY: 1.5
    });
    layer.add(rect);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(rect);

    layer.draw();
    assert.equal(tr.getClassName(), 'Transformer');

    assert.equal(tr.x(), rect.x());
    assert.equal(tr.y(), rect.y());
    assert.equal(tr.width(), rect.width() * rect.scaleX());
    assert.equal(tr.height(), rect.height() * rect.scaleY());
    assert.equal(tr.rotation(), rect.rotation());
  });

  test('try to fit a transformed rect', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 150,
      y: 60,
      draggable: true,
      width: 150,
      height: 100,
      fill: 'yellow',
      rotation: 90,
      scaleY: 1.5
    });
    layer.add(rect);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(rect);

    layer.draw();

    tr._fitNodeInto({
      x: 100,
      y: 70,
      width: 100,
      height: 100
    });

    assert.equal(rect.x(), 100);
    assert.equal(rect.y(), 70);
    assert.equal(rect.width() * rect.scaleX(), 100);
    assert.equal(rect.height() * rect.scaleY(), 100);
    assert.equal(rect.rotation(), rect.rotation());
  });

  test('add transformer for transformed rect with offset', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 50,
      y: 50,
      draggable: true,
      width: 100,
      height: 100,
      fill: 'yellow',
      offsetX: 50,
      offsetY: 50
    });
    layer.add(rect);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(rect);

    layer.draw();
    assert.equal(tr.getClassName(), 'Transformer');

    assert.equal(tr.x(), rect.x() - 50);
    assert.equal(tr.y(), rect.y() - 50);
    assert.equal(tr.width(), rect.width() * rect.scaleX());
    assert.equal(tr.height(), rect.height() * rect.scaleY());
    assert.equal(tr.rotation(), rect.rotation());
  });

  test.skip('fit rect with offset', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 50,
      y: 50,
      draggable: true,
      width: 100,
      height: 100,
      fill: 'yellow',
      offsetX: 50,
      offsetY: 50
    });
    layer.add(rect);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(rect);

    tr._fitNodeInto({
      x: 50,
      y: 50,
      width: 200,
      height: 100
    });

    assert.equal(rect.x(), 100);
    assert.equal(rect.y(), 100);
    assert.equal(rect.width() * rect.scaleX(), 200);
    assert.equal(rect.height() * rect.scaleY(), 100);
    assert.equal(rect.rotation(), rect.rotation());

    layer.draw();
  });

  test('add transformer for circle', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var circle = new Konva.Circle({
      x: 40,
      y: 40,
      draggable: true,
      radius: 40,
      fill: 'yellow'
    });
    layer.add(circle);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(circle);

    layer.draw();
    assert.equal(tr.getClassName(), 'Transformer');

    assert.equal(tr.x(), 0);
    assert.equal(tr.y(), 0);
    assert.equal(tr.width(), circle.width() * circle.scaleX());
    assert.equal(tr.height(), circle.height() * circle.scaleY());
    assert.equal(tr.rotation(), circle.rotation());
  });

  test('fit a circle', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var circle = new Konva.Circle({
      x: 40,
      y: 40,
      draggable: true,
      radius: 40,
      fill: 'yellow'
    });
    layer.add(circle);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(circle);

    tr._fitNodeInto({
      x: 40,
      y: 40,
      width: 160,
      height: 80
    });
    layer.draw();

    assert.equal(circle.x(), 120);
    assert.equal(circle.y(), 80);
    assert.equal(circle.width() * circle.scaleX(), 160);
    assert.equal(circle.height() * circle.scaleY(), 80);

    assert.equal(tr.x(), 40);
    assert.equal(tr.y(), 40);
    assert.equal(tr.width(), 160);
    assert.equal(tr.height(), 80);
  });

  test('fit a rotated circle', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var circle = new Konva.Circle({
      x: 40,
      y: 40,
      draggable: true,
      radius: 40,
      fill: 'yellow'
    });
    layer.add(circle);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(circle);

    tr._fitNodeInto({
      x: 80,
      y: 0,
      width: 80,
      height: 80,
      rotation: 90
    });
    layer.draw();

    assert.equal(circle.x(), 40);
    assert.equal(circle.y(), 40);
    assert.equal(circle.width() * circle.scaleX(), 80);
    assert.equal(circle.height() * circle.scaleY(), 80);
    assert.equal(circle.rotation(), 90);

    assert.equal(tr.x(), 80);
    assert.equal(tr.y(), 0);
    assert.equal(tr.width(), 80);
    assert.equal(tr.height(), 80);
  });

  test('add transformer for transformed circle', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var circle = new Konva.Circle({
      x: 100,
      y: 100,
      draggable: true,
      radius: 40,
      fill: 'yellow',
      scaleX: 1.5
    });
    layer.add(circle);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(circle);

    layer.draw();
    assert.equal(tr.getClassName(), 'Transformer');

    assert.equal(tr.x(), 40);
    assert.equal(tr.y(), 60);
    assert.equal(tr.width(), 120);
    assert.equal(tr.height(), 80);
    assert.equal(tr.rotation(), 0);
  });

  test('add transformer for rotated circle', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var circle = new Konva.Circle({
      x: 100,
      y: 100,
      draggable: true,
      radius: 40,
      fill: 'yellow',
      scaleX: 1.5,
      rotation: 90
    });
    layer.add(circle);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(circle);

    layer.draw();

    assert.equal(tr.x(), 140);
    assert.equal(tr.y(), 40);
    assert.equal(tr.width(), 120);
    assert.equal(tr.height(), 80);
    assert.equal(tr.rotation(), circle.rotation());
  });

  test('add transformer to group', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var group = new Konva.Group({
      x: 50,
      y: 50,
      draggable: true
    });
    layer.add(group);

    var shape1 = new Konva.Rect({
      radius: 100,
      fill: 'red',
      x: 0,
      y: 0,
      width: 100,
      height: 100
    });

    group.add(shape1);

    var shape2 = new Konva.Rect({
      radius: 100,
      fill: 'yellow',
      x: 50,
      y: 50,
      width: 100,
      height: 100
    });
    group.add(shape2);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(group);

    layer.draw();

    assert.equal(tr.x(), group.x());
    assert.equal(tr.y(), group.y());
    assert.equal(tr.width(), 150);
    assert.equal(tr.height(), 150);
    assert.equal(tr.rotation(), 0);
  });

  test('rotated fit group', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var group = new Konva.Group({
      x: 100,
      y: 100,
      draggable: true
    });
    layer.add(group);

    var shape1 = new Konva.Rect({
      fill: 'red',
      x: -50,
      y: -50,
      width: 50,
      height: 50
    });

    group.add(shape1);

    var shape2 = new Konva.Rect({
      fill: 'yellow',
      x: 0,
      y: 0,
      width: 50,
      height: 50
    });
    group.add(shape2);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(group);

    tr._fitNodeInto({
      x: 100,
      y: 0,
      width: 100,
      height: 100,
      rotation: 90
    });
    layer.draw();

    var rect = group.getClientRect();

    assert.equal(group.x(), 50);
    assert.equal(group.y(), 50);
    assert.equal(rect.width, 100);
    assert.equal(rect.height, 100);
    assert.equal(group.rotation(), 90);

    assert.equal(tr.x(), 100);
    assert.equal(tr.y(), 0);
    assert.equal(tr.width(), 100);
    assert.equal(tr.height(), 100);
  });

  test('add transformer to another group', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var group = new Konva.Group({
      x: 100,
      y: 100,
      draggable: true
    });
    layer.add(group);

    var shape1 = new Konva.Rect({
      fill: 'red',
      x: -50,
      y: -50,
      width: 50,
      height: 50
    });

    group.add(shape1);

    var shape2 = new Konva.Rect({
      fill: 'yellow',
      x: 0,
      y: 0,
      width: 50,
      height: 50
    });
    group.add(shape2);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(group);

    layer.draw();

    assert.equal(tr.x(), 50);
    assert.equal(tr.y(), 50);
    assert.equal(tr.width(), 100);
    assert.equal(tr.height(), 100);
    assert.equal(tr.rotation(), 0);
  });

  test('fit group', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var group = new Konva.Group({
      x: 100,
      y: 100,
      draggable: true
    });
    layer.add(group);

    var shape1 = new Konva.Rect({
      fill: 'red',
      x: -50,
      y: -50,
      width: 50,
      height: 50
    });

    group.add(shape1);

    var shape2 = new Konva.Rect({
      fill: 'yellow',
      x: 0,
      y: 0,
      width: 50,
      height: 50
    });
    group.add(shape2);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(group);

    tr._fitNodeInto({
      x: 0,
      y: 0,
      width: 200,
      height: 100
    });
    layer.draw();

    var rect = group.getClientRect();

    assert.equal(group.x(), 100);
    assert.equal(group.y(), 50);
    assert.equal(rect.width, 200);
    assert.equal(rect.height, 100);

    assert.equal(tr.x(), 0);
    assert.equal(tr.y(), 0);
    assert.equal(tr.width(), 200);
    assert.equal(tr.height(), 100);
  });

  test('toJSON should not save attached node and children', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 100,
      y: 60,
      draggable: true,
      width: 100,
      height: 100,
      fill: 'yellow'
    });
    layer.add(rect);

    var tr = new Konva.Transformer();
    layer.add(tr);
    tr.attachTo(rect);

    layer.draw();

    var json = tr.toJSON();
    var object = JSON.parse(json);

    assert.equal(object.attrs.node, undefined);
    assert.equal(object.children, undefined);
  });

  test('make sure we can work without inner node', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var tr = new Konva.Transformer();
    layer.add(tr);

    layer.draw();
  });

  test('reset attrs on node set', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 100,
      y: 60,
      draggable: true,
      width: 100,
      height: 100,
      fill: 'yellow'
    });
    layer.add(rect);

    var tr = new Konva.Transformer();
    layer.add(tr);
    layer.draw();

    assert.equal(tr.getWidth(), 0);

    tr.attachTo(rect);
    assert.equal(tr.getWidth(), 100);
  });

  test('can destroy without attached node', function() {
    var tr = new Konva.Transformer();
    tr.destroy();
  });

  test('can add padding', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 100,
      y: 60,
      draggable: true,
      width: 100,
      height: 100,
      fill: 'yellow'
    });
    layer.add(rect);

    var tr = new Konva.Transformer({
      node: rect,
      padding: 10
    });
    layer.add(tr);

    tr._fitNodeInto({
      x: 0,
      y: 0,
      width: 120,
      height: 120
    });

    layer.draw();

    assert.equal(rect.x(), 10);
    assert.equal(rect.y(), 10);
    assert.equal(rect.width(), 100);
    assert.equal(rect.height(), 100);
  });

  test('can add padding with rotation', function() {
    var stage = addStage();
    var layer = new Konva.Layer();
    stage.add(layer);

    var rect = new Konva.Rect({
      x: 100,
      y: 60,
      draggable: true,
      width: 100,
      height: 100,
      fill: 'yellow'
    });
    layer.add(rect);

    var tr = new Konva.Transformer({
      node: rect,
      padding: 10
    });
    layer.add(tr);

    tr._fitNodeInto({
      x: 120,
      y: 0,
      width: 120,
      height: 120,
      rotation: 90
    });

    layer.draw();

    assert.equal(rect.x(), 110);
    assert.equal(rect.y(), 10);
    assert.equal(rect.width(), 100);
    assert.equal(rect.height(), 100);
    assert.equal(rect.rotation(), 90);
  });
});
