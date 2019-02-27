using System.Collections;
using System.Collections.Generic;
using ClockupStudio.Ninj.Player.Components;
using Unity.Entities;
using UnityEngine;

namespace ClockupStudio.Ninj.Player.Systems
{
    class MoveInputSystem : ComponentSystem
    {
        protected override void OnUpdate()
        {
            ForEach((Movement movement) =>
            {
                if (Input.GetKey(KeyCode.A))
                {
                    movement.Direction.x = -1;
                    movement.PressedMove = true;
                }
                else if (Input.GetKey(KeyCode.D))
                {
                    movement.Direction.x = 1;
                    movement.PressedMove = true;
                }
                else
                {
                    movement.PressedMove = false;
                }
            });
        }
    }

}
