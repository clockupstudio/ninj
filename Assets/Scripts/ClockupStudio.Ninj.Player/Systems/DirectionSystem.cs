using System.Collections;
using System.Collections.Generic;
using ClockupStudio.Ninj.Player.Components;
using Unity.Entities;
using UnityEngine;

namespace ClockupStudio.Ninj.Player.Systems
{
    [UpdateAfter(typeof(MoveInputSystem))]
    public class DirectionSystem : ComponentSystem
    {
        protected override void OnUpdate()
        {
            ForEach((Movement movement, Transform transform) =>
            {
                var scale = transform.localScale;
                scale.x = movement.Direction.x;
                transform.localScale = scale;
            });
        }
    }

}
